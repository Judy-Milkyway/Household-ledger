import styles from "@/styles/login.module.scss";
import { Button, Checkbox, Form, Toast } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  // 0 是登录，1 是注册
  const [type, setType] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.error("请输入用户名或密码");
      return;
    }
    if (!type) {
      try {
        const { token } = await (
          await fetch("/api/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              username,
            }),
          })
        ).json();
        if (token) {
          Cookies.set("token", token);
          Toast.success("登录成功");
          setTimeout(() => {
            router.push("/home");
          }, 2000);
        } else {
          Toast.error("用户名或密码错误");
        }
      } catch (error) {
        Toast.error("用户名或密码错误");
      }
    } else {
      const { token } = await (
        await fetch("/api/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            username,
          }),
        })
      ).json();
      if (token) {
        Cookies.set("token", token);
        Toast.success("注册成功");
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.login}>
          <div className={styles.component66}>
            <div className={styles.header}>
              <p className={styles.title}>欢迎回来</p>
              <p className={styles.text}>
                <span className={styles.text}>
                  {type === false ? "登录" : "注册"}
                </span>
                <span
                  className={styles.text1}
                  style={{ fontWeight: 600, color: "#333" }}
                >
                  家庭记账本
                </span>
                <span className={styles.text2}>账户</span>
              </p>
            </div>
          </div>
          <div className={styles.form}>
            <Form className={styles.inputs}>
              <Form.Input
                label={{ text: "用户名" }}
                field="input"
                placeholder="输入用户名"
                onChange={setUsername}
                style={{ width: "100%" }}
                fieldStyle={{ alignSelf: "stretch", padding: 0 }}
              />
              <Form.Input
                label={{ text: "密码" }}
                field="field1"
                type="password"
                placeholder="输入密码"
                style={{ width: "100%" }}
                onChange={setPassword}
                fieldStyle={{ alignSelf: "stretch", padding: 0 }}
              />
            </Form>
            <a onClick={() => setType(!type)}>
              {type === false ? "注册" : "登录"}
            </a>
            <Button
              theme="solid"
              className={styles.button}
              loading={loading}
              onClick={handleLogin}
            >
              {type === false ? "登录" : "注册"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
