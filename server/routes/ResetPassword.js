const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize')

const { ResetPassword, Users } = require('../models');

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({
            where: { email: email }
        });

        if (user) {
            const token = crypto.randomBytes(20).toString('hex');

            await ResetPassword.create({
                userId: user.userId,
                token: token,
                expiresAt: Date.now() + 3600000 // 1 hour expiration
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465, // or 587 for TLS
                secure: true, // true for port 465, false for port 587
                auth: {
                    user: 'halimaderki399@gmail.com',
                    pass: 'gjbb imoc wzll qwpv', 
                },
            });

            const link = `http://localhost:3000/reset-password/${token}`;

            transporter.sendMail({
                from: {
                    name: 'Instagram',
                    address: 'halimaderki399@gmail.com'
                },
                to: email,
                subject: 'Reset Password',
                html: `<h2>Hi, ${user.userName}</h2>
                       <p>We got a request to reset your Instagram password.</p>
                       <a style="text-decoration: none; color: #fff; background-color: cornflowerblue; padding: 8px 10px; font-size: 18px; font-weight: 500" href="${link}">Reset Password</a>
                       <p>If you ignore this message, your password will not be changed. If you didn't request a password reset, let us know.</p>`,
            }, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to send email' });
                } else {
                    return res.status(200).json({
                        message: 'Email has been sent successfully.',
                        info: info
                    });
                }
            });
        } else {
            res.status(404).json({ userError: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;

    try {
        const resetEntry = await ResetPassword.findOne({
            where: {
                token: token,
                expiresAt: { [Op.gt]: Date.now() }
            }
        });

        if (resetEntry) {
            const user = await Users.findByPk(resetEntry.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.password = await bcrypt.hash(password, 10);
            await user.save();

            const accessToken = sign(
                {
                    userId: user.userId,
                    userName: user.userName
                },
                'ImportantSecret'
            );

            await resetEntry.destroy();
            res.status(201).json({
                message: 'Password changed successfully',
                accessToken: accessToken,
                userName: user.userName,
                fullName: user.fullName,
                userImg: user.userImg
            });

        } else {
            res.status(400).json({
                tokenExpired: 'Invalid or expired token'
            });
        }

    } catch (error) {
        console.error('Error resetting password:', error); // Detailed error logging
        res.status(500).json({
            serverError: 'Internal server error'
        });
    }
});


module.exports = router;