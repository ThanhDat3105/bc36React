import React, { useEffect } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useState } from "react";
import { addMovieApi, editMovieApi, fetchMovieDetailApi } from "services/movie";
import { GROUP_ID } from "constants";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

export default function MovieForm() {
  const [form] = useForm();

  const params = useParams();

  const [imgPreview, setImgPreview] = useState();

  const [file, setFile] = useState();

  useEffect(() => {
    if (params.id) {
      getMovieDetail();
    }
  }, [params.id]);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.id);

    form.setFieldsValue({
        tenPhim: result.data.content.tenPhim,
      trailer: result.data.content.trailer,
      moTa: result.data.content.moTa,
      ngayKhoiChieu: moment(result.data.content.ngayKhoiChieu),
      sapChieu: result.data.content.sapChieu,
      dangChieu: result.data.content.dangChieu,
      hot: result.data.content.hot,
      danhGia: result.data.content.danhGia,
    });
    console.log(result.data.content.tenPhim);

    setImgPreview(result.data.content.hinhAnh);
    console.log(result);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleFinish = async (values) => {
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");

    const formData = new FormData();

    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append("maNhom", GROUP_ID);
    formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    file && formData.append("File", file, file.name);

    if (params.id) {
        formData.append("maPhim", params.id)
      await editMovieApi(formData);
    } else {
      await addMovieApi(formData);
    }

    // notification.success({
    //     message: params.id 
    // })
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  };
  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "GP02",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        danhGia: 5,
      }}
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Tên Phim"
        name="tenphim"
        // rules={[
        //   { required: true, message: "không được để trống!" },
        //   { min: 5, message: "Tên phim phải lớn hơn 5" },
        //   {
        //     max: 20,
        //     message: "Nhỏ hơn hoặc bằng 20 ký tự",
        //   },
        // ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô Tả" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang Chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp Chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số Sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <Input onChange={handleFile} type="file"></Input>
      </Form.Item>
      <Image src={imgPreview} />
      <Form.Item label="Tác Vụ">
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
}
