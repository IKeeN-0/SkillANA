/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *
 *     UserPublic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *
 *     UserFull:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         aboutMe:
 *           type: string
 *         profileImg:
 *           type: string
 *
 *         contact:
 *           type: object
 *           properties:
 *             phoneNumber:
 *               type: string
 *             address:
 *               type: string
 *
 *         education:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               level:
 *                 type: string
 *               major:
 *                 type: string
 *               university:
 *                 type: string
 *
 *         experience:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *
 *         badges:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               badgeId:
 *                 type: string
 *               badgeName:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *               earnedAt:
 *                 type: string
 *                 format: date-time
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Badge:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         badgeName:
 *           type: string
 *         imgUrl:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: object
 *           properties:
 *             categoryId:
 *               type: string
 *             name:
 *               type: string
 *         criteria:
 *           type: object
 *           properties:
 *             questionNum:
 *               type: number
 *             timeLimit:
 *               type: string
 *             passingScore:
 *               type: number
 *         test:
 *           type: object
 *           properties:
 *             questions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   answers:
 *                     type: array
 *                     items:
 *                       type: string
 *                   correctAnswer:
 *                     type: string
 *
 *     PendingUser:
 *       type: object
 *       properties:
 *         pendingUser:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *
 *     BadgeAddRequest:
 *       type: object
 *       required:
 *         - badgeId
 *         - badgeName
 *         - imgUrl
 *       properties:
 *         badgeId:
 *           type: string
 *         badgeName:
 *           type: string
 *         imgUrl:
 *           type: string
 *
 *     PrintRequest:
 *       type: object
 *       required:
 *         - data
 *         - templateId
 *       properties:
 *         data:
 *           type: object
 *           description: Resume data to render into PDF
 *         templateId:
 *           type: string
 *           description: Resume template identifier
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Returns public user profile (password excluded). No authentication required.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFull'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserFull'
 *
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFull'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden — token user ID does not match path ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/users/{id}/badge:
 *   post:
 *     summary: Add badge to user
 *     description: Appends a badge to the user's badges array if not already earned.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BadgeAddRequest'
 *
 *     responses:
 *       200:
 *         description: Badge added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Badge added successfully
 *                 data:
 *                   $ref: '#/components/schemas/UserFull'
 *       400:
 *         description: Invalid ID format or user already has this badge
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
/**
 * @swagger
 * /api/badges:
 *   get:
 *     summary: Get all badges
 *     tags: [Badges]
 *     responses:
 *       200:
 *         description: List of badges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Badge'
 *       500:
 *         description: Failed to fetch badges
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/badges/{id}:
 *   get:
 *     summary: Get badge by ID
 *     tags: [Badges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Badge found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 badge:
 *                   $ref: '#/components/schemas/Badge'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Badge not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch badge
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Complete registration from pending user
 *     description: Creates a full user account after OTP verification using pending user data.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Create user successfully
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing pending user, missing information, or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/auth/register/pending-users:
 *   post:
 *     summary: Create pending user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [firstName, lastName, email, password]
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pending user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       201:
 *         description: Pending user created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendingUser'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/auth/otp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email]
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/auth/otp/verify:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, otp_code]
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/print:
 *   post:
 *     summary: Generate resume PDF
 *     description: Renders resume data with the given template and returns a PDF file.
 *     tags: [Print]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrintRequest'
 *     responses:
 *       200:
 *         description: PDF generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: PDF generation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/uploadthing:
 *   get:
 *     summary: UploadThing route handler (GET)
 *     description: UploadThing internal GET handler for upload configuration.
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: UploadThing GET response
 *   post:
 *     summary: Upload profile image
 *     description: |
 *       UploadThing file upload endpoint. Use the `profileImg` slug.
 *       Requires Bearer JWT. Max file size 4MB. Accepted type: image.
 *       On success, updates the authenticated user's `profileImg` field.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Upload completed
 *       401:
 *         description: Unauthorized — missing or invalid JWT
 *       500:
 *         description: Upload or database update failed
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, password]
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export {};