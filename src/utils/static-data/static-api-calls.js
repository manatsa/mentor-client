import React, {useEffect, useState} from "react";
import {getFetch} from "../../services/fetcher";

const GetAuthorities=(user)=>{
    const [rolez, setRolez] =useState([]);
      const role=()=>{

            if (user && user.token) {
                const url = "/admin/authorities";
                const callApi = async () => {
                    let res = await getFetch(url, user);
                    setRolez(res.map(a => a.name));
                };
            }
            return []
        }


     role();
      alert(rolez);
      return rolez;
}

export default GetAuthorities;