import LocalSearch from "@/components/shared/Search/LocalSearch";
import SearchIcon from "@/app/public/assets/icons/search.svg";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/Cards/UserCard";

const Page = async () => {
  const result = await getAllUsers();
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={"/community"}
          iconPosition={"left"}
          imgSrc={SearchIcon}
          placeholder={"Search Our Vast Community of Amazing Minds"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={UserFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {(result?.users ?? []).length > 0 ? (
          result?.users.map((users) => (
            <UserCard key={users?._id} user={users}></UserCard>
          ))
        ) : (
          <NoResult
            title={"There are no users yet!"}
            description={
              "Be the first to break the silence! 🚀 Join us and kickstart Devflow. With Devflow, your questions can be answered by various software engineering experts."
            }
            route={"/sign-up"}
            linktext={"Join to be The First!"}
          />
        )}
      </section>
    </>
  );
};

export default Page;
