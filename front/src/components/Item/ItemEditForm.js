import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ItemEditForm = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItemData();
  }, []);

  const getItemData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/dummy/data.json");
      setItem(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const initialValues = {
    itemImage: "/assets/images/default.jpg",
    itemName: "",
    itemDetail: "",
    description: "",
  };

  const encodeFile = async (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    try {
      reader.onload = async () => {
        const newItem = {
          ...item,
          itemImage: reader.result,
        };
        setItem(newItem);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const { itemImage, itemName, itemDetail, description } = item;

  const isItemName = itemName.length >= 2 && itemName.length <= 25;
  const isItemDetail = itemDetail.length >= 2 && itemDetail.length <= 100;
  const isdescription = description.length >= 2 && description.length <= 30;

  const validate = isItemName && isItemDetail && isdescription;

  const handleChange = (e) => {
    const newItem = {
      ...item,
      [e.target.name]: e.target.value,
    };
    setItem(newItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { itemImage, itemName, itemDetail, description };

    try {
      await axios
        .post("http://localhost:5000/item/create", data)
        .then((res) => {
          console.log("response:", res.data);
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="itemImage">상품 이미지</label>
        <input
          type="file"
          name="itemImage"
          onChange={(e) => {
            encodeFile(e.target.files[0]);
          }}
          accept="image/*"
          multiple
        />

        <div className="preview">
          {itemImage && <StyledImage src={itemImage} alt="미리보기 이미지" />}
        </div>

        <label htmlFor="itemName">상품명</label>
        <input
          onChange={handleChange}
          name="itemName"
          id="itemName"
          type="text"
          value={itemName}
        />
        <label htmlFor="itemDetail">상품소개</label>
        <input
          onChange={handleChange}
          name="itemDetail"
          id="itemDetail"
          type="text"
          value={itemDetail}
        />
        <label htmlFor="description">한 마디</label>
        <input
          type="text"
          onChange={handleChange}
          name="description"
          id="description"
          value={description}
        />
        <button disabled={!validate}>생성</button>
      </StyledForm>
    </>
  );
};

export default ItemEditForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid black;

  width: 500px;
  height: 1000px;
`;

const StyledImage = styled.img`
  width: 100%;
`;
