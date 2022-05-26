import styled from "styled-components";
import { CustomInput } from "../../../components/ui/CustomInput";
import { Button } from "../../../components/ui/Button";
import { FileInput } from "../../../components/ui/FileInput";
import { ReactComponent as AddPhotoIcon } from "../../../assets/images/icons/addPhoto.svg";
import { UseFormMethods } from "react-hook-form";
import { FC } from "react";

interface FormProps extends Partial<Pick<UseFormMethods, "register">> {
  onSubmit: () => void;
  previewImage: string | undefined;
}

export const FormAddTeam: FC<FormProps> = ({
  onSubmit,
  register,
  previewImage,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <AddImg>
        <ImgInputWrapper>
          <FileInputIcon />
          {previewImage && <TeamImg src={previewImage} />}
          <FileInput register={register} />
        </ImgInputWrapper>
      </AddImg>
      <WrapperItem>
        <AddTeamDetails>
          <CustomInput
            register={register}
            name="name"
            label="Team"
            type="text"
          />
          <CustomInput
            register={register}
            name="division"
            label="Division"
            type="text"
          />
          <CustomInput
            register={register}
            name="conference"
            label="Conference"
            type="text"
          />
          <CustomInput
            register={register}
            name="foundationYear"
            label="Year of foundation"
            type="text"
          />
        </AddTeamDetails>
        <ButtonsWrapper>
          <Button type="reset" cancelBtn>
            Cancel
          </Button>
          <Button>Save</Button>
        </ButtonsWrapper>
      </WrapperItem>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 48px 24px;
  height: 100%;
  @media screen and ${({ theme }) => theme.deviceSize.tablet} {
    flex-direction: row;
    align-items: flex-start;
    padding: 48px 0;
  }
`;

const AddImg = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  height: 100%;
  @media screen and ${({ theme }) => theme.deviceSize.tablet} {
    justify-content: flex-start;
    max-width: 545px;
    margin: 0 75px;
  }
`;

const ImgInputWrapper = styled.div`
  max-width: 185px;
  width: 100%;
  height: 144px;
  margin-bottom: 48px;
  background: #9c9c9c;
  border-radius: 10px;
  position: relative;

  @media screen and ${({ theme }) => theme.deviceSize.tablet} {
    max-width: 336px;
    width: 100%;
    height: 261px;
    margin-bottom: 0;
  }
`;

const FileInputIcon = styled(AddPhotoIcon)`
  position: absolute;
  z-index: 99;
  max-width: 41px;
  max-height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.7;
  @media screen and ${({ theme }) => theme.deviceSize.tablet} {
    max-width: 100%;
    max-height: 100%;
  }
`;
const WrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 366px;
  gap: 24px;
  width: 100%;

  @media screen and ${({ theme }) => theme.deviceSize.tablet} {
    margin-right: 24px;
  }
`;

const AddTeamDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const TeamImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 50;
  top: 50%;
  left: 50%;
  opacity: 0.5;
  transform: translate(-50%, -50%);
  position: absolute;
`;
