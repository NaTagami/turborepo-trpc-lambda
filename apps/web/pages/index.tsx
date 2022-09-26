import { Button } from "ui";
import { UserName } from "common";
import { trpc } from "../utils/trpc";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const hello = trpc.useQuery([
    "hello",
    { name: UserName.parse("Naoki"), message: "TEST" },
  ]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{hello.data.message}</h1>
      <Button />
    </div>
  );
};

export default Home;
