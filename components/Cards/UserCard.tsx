"use server";

import { getTopInteractedTags } from "@/lib/actions/tags.action";
import { ShortenUsername } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import RenderTags from "../shared/RenderTags";
import { Badge } from "../ui/badge";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className=" shadow-light100_dark100 background-light900_dark200 w-full rounded-3xl p-8 max-xs:w-full xs:w-[260px]"
    >
      <article className="flex w-full flex-col items-center justify-center">
        <Image
          src={`${user.picture}`}
          alt={`${user.name} profile-picture`}
          width={100}
          height={100}
          className="rounded-[60px]"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>

          <p className="body-regular text-dark500_light500 mt-2">{`@${ShortenUsername(
            user.username
          )}`}</p>
        </div>

        <div className="mt-5">
          {(interactedTags ?? []).length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags?.map((tag) => (
                <RenderTags key={tag?._id} {...tag} />
              ))}
            </div>
          ): (
            <Badge>
                No Tags Yet...
            </Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
