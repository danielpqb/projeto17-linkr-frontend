import React from "react";
import { useContext, useState, useEffect } from "react";

import UserContext from "../../contexts/userContext";
import { isFollowed, followUser, unfollowUser } from "../../services/linkrAPI";
import { StyledButton } from "./style";

export default function FollowButton({userPageData, setIsError}){
    const { userData, alert, setAlert } = useContext(UserContext);
    const [ loading, setLoading ] = useState(false);
    const [ followed, setFollowed ] = useState(false);

    useEffect(() => {  
        isFollowed(userPageData.id)
            .then((res) => {
                setFollowed(res.data);
                setIsError(false);
            })
            .catch((err) => setIsError(true));
    },[
        userPageData.id,
        setIsError
    ]);

    function handleFollow() {
        setLoading(true);
        if(!followed){
            followUser(userPageData.id)
            .then((res) => setFollowed(true))
            .catch((err) => setAlert({...alert,
                show:true,
                message:err.message,
                type: 0,
                doThis: () => {},
                color: "rgba(200,0,0)",
                icon: "alert-circle",}))
        }
        if(followed){
            unfollowUser(userPageData.id)
            .then((res) => setFollowed(false))
            .catch((err) => setAlert({...alert,
                show:true,
                message:err.message,
                type: 0,
                doThis: () => {},
                color: "rgba(200,0,0)",
                icon: "alert-circle",}))
        }
        setLoading(false);
    };

    return (
        <>
            {userPageData.id === userData.id ?
                <></>
                :
                <>
                    <StyledButton
                        followed={followed}
                        onClick={handleFollow}
                        disabled={loading}
                    >
                        {followed? "Unfollow" : "Follow"}
                    </StyledButton>
                </>
            }
        </>
    )
}