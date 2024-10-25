import Questions from "@/components/Forms/Questions";
import { getUserById } from "@/lib/actions/user.action";

import { redirect } from "next/navigation";

const page = async () => {
  // const { userId } = auth()

  const userId = "clerk123456";

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Questions mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;
