import { httpClient } from "../config/AxiosHelper"

export const createRoomreq = async(roomdetails)=>{

  const {data}=   await httpClient.post(`/api/v1/rooms/create`,roomdetails,{
    
  });
  return data;
}

export const joinRoomreq = async (room) => {
  const { data } = await httpClient.post(`/api/v1/rooms/login`, {
    roomId: room.roomId, // Include roomId in the body
    password: room.password, // Include password in the body
  });
  return data;
};

export const getmessages = async(roomId,size=50,page=0)=>{

  const {data}=   await httpClient.get(`/api/v1/rooms/${roomId}/messages?size=${size}&page=${page} `,{
    headers:{
        "Content-Type":"text/plain"
    }
  });
  return data;
}