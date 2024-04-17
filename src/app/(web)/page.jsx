
import { getBlog } from "./blog/action";
import { BlogGrid } from "./blog/_components/blog";
export default async function Home() {
  const blogs = await getBlog({ limit: 4 });
  //  console.log(blogs)
  return (
    <div className="min-h-screen">
      <div>
        {blogs &&
          <div style={{ backgroundImage: `url('${blogs[0]?.img_url}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            <div className="bg-black/50 text-white backdrop-blur-xl">
              <BlogGrid content={blogs} />
            </div>
          </div>
        }
      </div>
    </div>
  );
}
