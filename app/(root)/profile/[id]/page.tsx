import ProfileLink from "@/components/shared/ProfileLink";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { cn, getDateJoined, ShortenUsername } from "@/lib/utils";
import LocationIcon from "@/app/public/assets/icons/location.svg";
import CalendarIcon from "@/app/public/assets/icons/calendar.svg";
import LinkIcon from "@/app/public/assets/icons/link.svg";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import Stats from "@/components/shared/Stats";
import QuestionsTab from "@/components/shared/QuestionsTab";

const Page = async ({ params , searchParams}: URLProps) => {
  const { userId: clerkId } = auth();
  // Get the User id from the Page Route
  const UserInfo = await getUserInfo({ userId: params.id });

  console.log(UserInfo);

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={UserInfo?.user.picture}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {UserInfo?.user.name}
            </h2>
            <h2 className="paragraph-regular text-dark200_light800">{`@ ${ShortenUsername(
              UserInfo?.user.username
            )}`}</h2>

            <div className=" mt-5 flex flex-wrap items-center justify-start gap-5">
              {UserInfo?.user?.portfolioWebsite && (
                <ProfileLink
                  imgUrl={LinkIcon}
                  title={"Portfolio-Website"}
                  href={UserInfo?.user.portfolioWebsite}
                />
              )}

              {UserInfo?.user.location && (
                <ProfileLink
                  imgUrl={LocationIcon}
                  title={UserInfo?.user.location}
                />
              )}

              <ProfileLink
                imgUrl={CalendarIcon}
                title={getDateJoined(UserInfo?.user.joinedAt)}
              />
            </div>

            {UserInfo?.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {UserInfo?.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === UserInfo?.user.clerkId && (
              <Link href={`/profile/edit`}>
                <Button className={`paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] ${cn("rounded-[10px]")}`}>
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats 
        totalQuestions={UserInfo?.totalQuestions}
        totalAnswers={UserInfo?.totalAnswers}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList
            className={cn(
              "background-light800_dark400 min-h-[42px] p-2 rounded-[6px]"
            )}
          >
            <TabsTrigger
              value="top-posts"
              className={`tab ${cn("rounded-[6px]")}`}
            >
              Top Posts
            </TabsTrigger>
            <TabsTrigger
              value="answer"
              className={`tab ${cn("rounded-[6px]")}`}
            >
              Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-posts">
            <QuestionsTab
                searchParams={searchParams}
                userId={UserInfo?.user._id}  
                clerkId={clerkId}        
              />
          </TabsContent>

          <TabsContent value="answer">Answers</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
