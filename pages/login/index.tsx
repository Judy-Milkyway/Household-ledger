import styles from "@/styles/login.module.scss";
import { Button, Checkbox, Form, Toast } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "123" && password === "123") {
      Cookies.set("token", 123);

      setTimeout(() => {
        Toast.success("登陆成功");
        router.push("/");
      }, 2000);
    } else {
      setTimeout(() => {
        Toast.error("账号或密码错误");
      }, 2000);
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
                <span className={styles.text}>登录</span>
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
            <Checkbox type="default">记住我</Checkbox>
            <Button
              theme="solid"
              className={styles.button}
              loading={loading}
              onClick={handleLogin}
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
