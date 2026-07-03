import { useForm } from "react-hook-form";
import { type SignUpInputType, signUpSchema } from "../../../schemas/auth/signUpSchma.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Gender } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate } from "react-router";
import axiosInstance from "../../../api/axiosInstance.tsx";
import * as axios from "axios";

function SignUpPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpInputType>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: SignUpInputType) => {
        try {
            const { passwordConfirm, ...submitData } = data;

            await axiosInstance.post("/user/create", submitData);

            alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
            navigate("/auth/signin");
        } catch (error) {
            console.log(error);

            let errorMessage = "회원가입 중 오류가 발생했습니다.";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError("root", { message: errorMessage });
        }
    };

    return (
        <AuthContainer>
            <FormCard onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <SubTitle>토론대난투에 오신 것을 환영합니다!</SubTitle>
                <FormBox>
                    <InputGroup>
                        <Label htmlFor={"username"}>아이디</Label>
                        <Input
                            {...register("username")}
                            $hasError={!!errors.username}
                            id={"username"}
                            placeholder={"4자 이상 필요"}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"password"}>비밀번호</Label>
                        <Input
                            {...register("password")}
                            $hasError={!!errors.password}
                            id={"password"}
                            placeholder={"6자 이상 필요"}
                            type={"password"}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"passwordConfirm"}>비밀번호 확인</Label>
                        <Input
                            {...register("passwordConfirm")}
                            $hasError={!!errors.passwordConfirm}
                            id={"passwordConfirm"}
                            placeholder={"비밀번호를 한 번 더 입력해주세요"}
                            type={"password"}
                        />
                        {errors.passwordConfirm && (
                            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"nickname"}>닉네임</Label>
                        <Input
                            {...register("nickname")}
                            $hasError={!!errors.nickname}
                            id={"nickname"}
                        />
                        {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"email"}>이메일</Label>
                        <Input
                            {...register("email")}
                            $hasError={!!errors.email}
                            id={"email"}
                            type={"email"}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"phoneNumber"}>전화번호</Label>
                        <Input
                            {...register("phoneNumber")}
                            $hasError={!!errors.phoneNumber}
                            id={"phoneNumber"}
                            type={"tel"}
                        />
                        {errors.phoneNumber && (
                            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"birthdate"}>생년월일</Label>
                        <Input
                            {...register("birthdate")}
                            $hasError={!!errors.birthdate}
                            id={"birthdate"}
                            type={"date"}
                        />
                        {errors.birthdate && (
                            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"gender"}>성별</Label>
                        <Select {...register("gender")} $hasError={!!errors.gender} id={"gender"}>
                            <option value={""}>성별을 선택해주세요</option>
                            <option value={Gender.MALE}>남성</option>
                            <option value={Gender.FEMALE}>여성</option>
                        </Select>
                        {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
                    </InputGroup>
                </FormBox>
                {errors.root && <RootErrorMessage>{errors.root.message}</RootErrorMessage>}
                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    회원가입
                </Button>
            </FormCard>
        </AuthContainer>
    );
}

export default SignUpPage;

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormCard = styled.form`
    width: 100%;
    max-width: 480px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 40px 20px;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 8px;
    text-align: center;
`;

const SubTitle = styled.h6`
    font-size: 15px;
    color: ${props => props.theme.colors.text.disabled};
    text-align: center;
    margin-bottom: 32px;
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 800;
    padding: 0 5px;
    color: ${props => props.theme.colors.text.default};
`;

const Input = styled.input<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid
        ${props => (props.$hasError ? props.theme.colors.error : props.theme.colors.divider)};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }
    &:focus {
        border-color: ${props =>
            props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const ErrorMessage = styled.span`
    font-size: 13px;
    color: ${props => props.theme.colors.error};
    font-weight: 500;
`;

const Select = styled.select<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid
        ${props => (props.$hasError ? props.theme.colors.error : props.theme.colors.divider)};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }

    &:focus {
        border-color: ${props =>
            props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const RootErrorMessage = styled.div`
    font-size: 13px;
    color: ${props => props.theme.colors.error};
    font-weight: 500;
    text-align: center;
    margin-bottom: 16px;
`;
