import { GetServerSidePropsContext } from "next";

export default function Page() {
  return <></>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/login", // 重定向目标路径
        permanent: false, // 是否永久重定向
      },
    };
  } else {
    return {
      redirect: {
        destination: "/home", // 重定向目标路径
        permanent: false, // 是否永久重定向
      },
    };
  }
}
