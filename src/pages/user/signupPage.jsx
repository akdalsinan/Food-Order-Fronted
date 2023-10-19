import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SliderCaptcha from "rc-slider-captcha";
import { Button, Checkbox, Form, Input } from "antd";

import { addUser } from "../../actions/userAction";

import closeeye from "../../../images/closeeye.png";
import openeye from "../../../images/openeye.png";
import bgImage from "../../../images/bgimage.jpg";
import puzzleImage from "../../../images/puzzleurl.png";


import MyNotification from "../../components/myNotification";

const SignupPage = () => {
  const [checked, setchecked] = useState(false);
  const [slider, setSlider] = useState(false);
  const [photo, setPhoto] = useState(openeye);

  const dispatch = useDispatch();

  const onchange = (e) => {
    setchecked(e.target.checked);
  };

  const onFinish = (value) => {
    dispatch(
      addUser({
        namesurname: value.nameSurname,
        email: value.SignEmail,
        password: value.SignPassword,
      })
    ).then((e) => {
      if (e.payload === "kayıt işlemi başarılı") {
        MyNotification("success", e.payload);
      }
    });
  };

  return (
    <div className="flex  ">
      <Form className=" w-[300px] " onFinish={onFinish}>
        <Form.Item name="nameSurname">
          <Input placeholder="Name Surname" />
        </Form.Item>
        <Form.Item name="SignEmail">
          <Input placeholder="Mail" />
        </Form.Item>
        <Form.Item name="SignPassword">
          <Input.Password
            placeholder="password"
            onFocus={() => setPhoto(closeeye)}
            onBlur={() => setPhoto(openeye)}
          />
        </Form.Item>
        <Checkbox onChange={onchange}></Checkbox>
        <h className="text-gray-500">
          Kişisel Verilerimin İşlenmesine Yönelik{" "}
          <a className="">Aydınlatma Metnini</a>
          Okudum
        </h>

        <SliderCaptcha
          tipText="deneme"
          mode="float"
          request={async () => {
            return {
              bgUrl: bgImage,
              puzzleUrl: puzzleImage,
            };
          }}
          onVerify={async (data) => {
            if (data?.x && data.x > 87 && data.x < 93) {
              setSlider(true);
              return Promise.resolve();
            }
            setSlider(false);
            return Promise.reject();
          }}
        />

        <Form.Item>
          <Button
            disabled={!(checked && slider)}
            htmlType="submit "
            className="bg-primary text-white hover:text-secondary cursor-pointer"
          >
            SİGN UP
          </Button>
        </Form.Item>
      </Form>
      <img src={photo} className="w-[200px] h-[250px] " alt="" />
    </div>
  );
};

export default SignupPage;
