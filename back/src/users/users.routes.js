import express from "express";
import service from "./users.service";
import validation from "./users.validation";
import { validate } from "express-validation";
const router = express.Router();

// 회원가입
// router.post('/register', validate(validation, {}, {}), service.register);
router.post("/register", service.register);

// 로그인
router.post("/login", service.login);

// 회원전체 조회
router.get("/", service.findUsers);

// 프로필조회
router.get("/profile/:userId", service.getProfile);

// 프로필수정
router.put("/profile", service.updateProfile);

// 회원탈퇴
router.delete("/leave", service.leave);

export default router;
