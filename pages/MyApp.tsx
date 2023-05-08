import { FC, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

export const MyApp: FC = () => {
  const ldClient = useLDClient();
  const flags = useFlags();

  useEffect(() => {
    console.log({ flags });
  }, [flags]);

  const { kenOguraTestFlag } = flags;
  const [userNameText, setUserNameText] = useState("");
  const [userName, setUserName] = useState("");
  const onClickUserNameButton = useCallback(() => {
    if (userNameText !== "") {
      setUserName(userNameText);
      ldClient?.identify({
        kind: "user",
        key: userNameText,
        name: userNameText,
      });
    }
  }, [userNameText, ldClient]);
  return (
    <div style={{ width: "100%" }}>
      <div>
        <label htmlFor="user">User:</label>
        <input
          type="text"
          name="user"
          id="user"
          value={userNameText}
          onChange={(e) => setUserNameText(e.currentTarget.value)}
        />
        <button onClick={onClickUserNameButton}>Set UserName</button>
      </div>

      {kenOguraTestFlag && (
        <TheFeature>
          <span>New feature~</span>
        </TheFeature>
      )}
      <div>flag: {`${kenOguraTestFlag}`}</div>
    </div>
  );
};

const animation = keyframes`
    0%{
        width: 15%;
    }
    12%{
        width: 50%;
    }    
    25%{
        width: 25%;
    }
    38%{
        width: 50%;
    }    
    50%{
        width: 100%;
    }
    62%{
        width: 80%;
    }    
    74%{
        width: 25%;
    }
    86%{
        width: 50%;
    } 
    100%{
        width: 15%;
    } 
`;

const TheFeature = styled.div`
  animation-name: ${animation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  background: #ffbb1e;
  height: 60px;
  text-align: left;
  color: red;
  font-weight: bold;
`;
