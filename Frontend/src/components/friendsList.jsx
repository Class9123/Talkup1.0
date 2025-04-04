import {
  Link,
  useNavigate
} from "react-router-dom";
import useUserStore from "../user/useUserStore.js";

const FriendsList = (props) => {
  const {
    setChattingFriendIndex
  } = useUserStore()
  let data = props.data;
  const navigate = useNavigate()
  return (
    <div>
      <div className="bg-base-100 scrollbar-hidden flex flex-row overflow-x-scroll border-b-[0.5px] border-black-400 p-2">
        {data.map((item, index) => (
          item.status === "online" && (
            <div
              onClick={() => {
                setChattingFriendIndex(index);
                navigate("/chat")
              }}
              key={index}
              className="ml-2 flex flex-col justify-center items-center hori-pr bg-base-100"
              >
              <div className="rounded-full skeleton h-14 w-14 flex items-center justify-center flex-col object-cover">
                <div className="avatar online">
                  <div className="w-14 h-14 rounded-full">
                    {item.pr && <img className="w-14 h-14" src={item.pr} />}
                </div>
              </div>
            </div>
            <p className="text-primary">
              {item.name && (item.name.length >= 6 ? item.name.slice(0, 6) + "...": item.name)}
            </p>
          </div>
        )
        ))}
    </div>

    <div className=" bg-base-100 scrollbar-hidden max-h-[100vh] overflow-y-scroll chats">
      {data.map((item, index) => (
        <div onClick={()=> {
          setChattingFriendIndex(index)
          navigate("/chat")
        }} className="flex justify-between p-2 text-primary chat" key={index}>
          <div className="gap-1 flex">
            <span className="ml-2">
              <div className="skeleton w-[7vh] h-[7vh] rounded-full overflow-hidden">
                {item.pr && <img className=" w-14 h-14 rounded-full object-cover" src={item.pr} alt="" />}
            </div>
          </span>
          <span>
            <div className="font-bold text-[1.1rem]">
              {item.name && (item.name.length >= 40 ? item.name.slice(0, 40) + "...": item.name)}
            </div>
            <div className="text-[0.8rem]">
              {item.msg && (item.msg.length >= 40 ? item.msg.slice(0, 40) + "...": item.msg)}
            </div>
          </span>
        </div>

        <div className="flex-col justify-center items-center">
          <div className="text-[0.7rem]">
            {item.time && item.time}
          </div>

          <div className="flex justify-end">
            {item.number && (
              <span className="bg-base-200 w-4 h-4 rounded-full text-primary text-[0.7rem] flex items-center justify-center">
                {item.number}
              </span>
            )}
          </div>
        </div>
      </div>
      ))}
    <div className="mb-[60vh]"></div>
  </div>
</div>
);
};

export default FriendsList;