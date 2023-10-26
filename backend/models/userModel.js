const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        validate: {
            validator: function (email) {
                return String(email).toLowerCase().match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            },
            message: (props) => `Email "${props.value}" is invalid`,
        }
    },
    name: {
        type: String,
        required: [true, 'Your name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    county: {
        type: String,
        required: [true, 'County is required']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    additionalDiagnoseInformation: String,
    role: String,
    industry: String,
    interests: String,
    softSkills: [String],
    desireImprovment: String,
    education: String,
    skills: [String],
    prevWorkDescription: String,
    stage: Number,
    goalFromAliza: String,
    supportNeeds: String,
    mentorFrequency: String,
    mentorGenderPrefered: String,
    communicationPreferences: String,
    accessibilityNeeds: [String],
    additionalSupportNeeds: String,
    communityEngagement: Boolean,
    referral: String,
    permission: {
        type: String,
        required: true,
        enum: {
            values: ['manager', 'mentor', 'user', 'therapist', 'careerAdvisor', 'communityLeader'],
            message: '{VALUE} is not a valid permission'
        }
    },
    description: String,
    availability: String,
    socketId: String,
    scheduleLink: String,
    meetings: [String],
    mentor:{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        link: String
    },
    therapist:{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        link: String
    },
    careerAdvisor:{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        link: String
    },
    communityLeader: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        link: String
    },
    status: {
        type: String,
        enum: ['online', 'offline']
    }
});

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes.

    return resetToken;
}

userSchema.methods.changedPasswordAfter = function(timestamp) {
    return timestamp < this.passwordChangedAt;
}

module.exports = mongoose.model('User', userSchema);