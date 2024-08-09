import express from 'express'

import { generate_otp_validation, login_validation, admin_signup_validation, user_signup_validation, verify_otp_validation, reset_password_validation, edit_staff_role_validation, create_lead_validation } from '../validations'

import { activate_account, admin_signup, all_staff, all_users, approve_staff_account, create_client, de_activate_account, delete_user_account, edit_staff_role, generate_user_otp, reset_password, user_login, user_signup } from '../controllers/authentication'
import { email_exist, verify_auth_id, verify_user_otp } from '../helpers/auth_helper'

import { all_leads, create_lead } from '../controllers/leads'

const router = express.Router()

router.route('/admin-signup').post(admin_signup_validation,  email_exist,  admin_signup)

router.route('/user-signup').post(user_signup_validation,  email_exist, user_signup)

router.route('/create-client').post(verify_auth_id, email_exist, create_client )

router.route('/user-login').post(login_validation, user_login )

router.route('/change-staff-role/:user_id').patch(verify_auth_id, edit_staff_role_validation, edit_staff_role )

router.route('/approve-staff-account/:user_id').patch(verify_auth_id, approve_staff_account )

router.route('/de-activate-user-account/:user_id').patch(verify_auth_id, de_activate_account )

router.route('/activate-user-account/:user_id').patch(verify_auth_id, activate_account )

router.route('/delete-user-account/:user_id').delete(verify_auth_id, delete_user_account )

router.route('/generate-otp').post(generate_otp_validation, generate_user_otp )

router.route('/verify-otp').post(verify_otp_validation, verify_user_otp )

router.route('/reset-password').patch(reset_password_validation, reset_password )

router.route('/all-users/:page_number').get(verify_auth_id, all_users)

router.route('/all-staff').get(verify_auth_id, all_staff)

// Leads

router.route('/all-leads/:page_number').get(verify_auth_id, all_leads)

router.route('/create-lead').post(verify_auth_id, create_lead_validation, create_lead)

router.route('/edit-lead/:lead_id').post(verify_auth_id, create_lead_validation, create_lead)



export default router