import {
  Link
} from "react-router-dom"
function Notfound() {
  return(

    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the
                doorway to the great nothing
              </h1>
              <p class="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need to go.
              </p>
              <Link to="/login" replace={true}>
                <span className="block mx-auto text-center text-white bg-blue-500 px-4 py-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:bg-blue-700 transition-transform duration-200 ease-in-out">
                  Go to login
                </span>
              </Link>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
        </div>
      </div>
    </div>
    <div>
      <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
  </div>
</div>
)
}

export default Notfound