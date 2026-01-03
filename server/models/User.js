const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLES = {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    STUDENT: 'student',
};

// Student Profile (Embedded)
const studentProfileSchema = new Schema({
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date },
    admissionYear: { type: String, example: '2025-26' },
    nationality: { type: String, default: 'Indian' },
    category: String,
    religion: String,
    maritalStatus: { type: String, enum: ['Married', 'Unmarried'], default: 'Unmarried' },
    identityType: String,
    idNumber: String,
    qualification: String,
    address: String,
    state: String,
    district: String,
    pincode: String
}, { _id: false });

//  Employee Profile (Embedded)
const employeeProfileSchema = new Schema({
    department: String,
    designation: String,
    joiningDate: Date,
    salary: Number,
    qualification: String
}, { _id: false });


// User Schema (Core)
const userSchema = new Schema({
    registrationId: { type: String, required: true, unique: true, index: true },
    app_id : { type: Number, required: true, index: true },
    name: { type: String, required: true, trim: true },
    mobileNo: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.STUDENT },

    studentProfile: { type: studentProfileSchema, default: undefined },
    employeeProfile: { type: employeeProfileSchema, default: undefined },

    status: { type: Number, enum: [0, 1], default: 1 }, // 0 - Inactive, 1 - Active
    isDeleted: { type: Number, enum: [0, 1], default: 0 }, // 0 - Not Deleted, 1 - Deleted
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    lastLoginAt: Date

}, { timestamps: true });

/* ---------------- Role ↔ Profile Validation ---------------- */
userSchema.pre('save', function () {
    // Skip validation if unrelated fields updated
    if (!this.isModified('role') &&
        !this.isModified('studentProfile') &&
        !this.isModified('employeeProfile')) {
        return;
    }

    if (this.role === ROLES.STUDENT && !this.studentProfile) {
        throw new Error('Student profile is required');
    }

    if (this.role === ROLES.EMPLOYEE && !this.employeeProfile) {
        throw new Error('Employee profile is required');
    }

    if (
        (this.role === ROLES.ADMIN || this.role === ROLES.SUPERADMIN) &&
        (this.studentProfile || this.employeeProfile)
    ) {
        throw new Error('Admin/SuperAdmin must not have profile data');
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
