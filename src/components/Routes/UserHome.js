import React, { useEffect, useState, useContext } from "react";
import { JtoSection } from "../Utils/Utils";
import { readUser } from "../../services/endpoints-service";
import TokenService from "../../services/token-service";
import { UserContext } from "../../contexts/UserContext";
import Config from "../../config";

const UserHome = () => {
  const [url, setUrl] = useState(`${Config.API_ENDPOINT}/users/${TokenService.getId()}`);
  const { value } = useContext(UserContext);
  useEffect(() => {
    const userFound = async () => {
      const result = await readUser.get("/").then((res) => {
        return res.data;
      });

      //   console.log(value.updateUser());
      value.updateUser(result);
    };

    userFound();
    // eslint-disable-next-line
  }, []);

  return (
    <JtoSection>
      <h1>Welcome, {value.user.full_name}</h1>
    </JtoSection>
  );
};

export default UserHome;
