import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CardItem from "./CardItem";

async function getData(pageNo) {
  try {
      const response = await axios.get(
          `http://localhost:3000/photos/?_page=${pageNo}&_per_page=10`
      );
      return response.data;
  } catch (error) {
      console.log(error);
  }
}
// const [loading, setLoading] = useState(false);

function App() {
  const [photos, setPhotos] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadRef = useRef(null);

    useEffect(() => {
        const isIntersection = async (items) => {
            const currentItem = items[0];

            if (currentItem.isIntersecting) {

                const data = await getData(page);

                if (data.next) {
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }

                if (photos) {
                    if (photos.next) {
                        setPhotos((prev) => {
                            const previousDataIds = new Set(
                                prev.data.map((item) => item.id)
                            );

                            const updatedData = data.data.filter(
                                (item) => !previousDataIds.has(item.id)
                            );

                            if (prev.next) {
                                return {
                                    ...data,
                                    data: [...prev.data, ...updatedData],
                                };
                            }
                        });
                    }
                } else {
                    setPhotos(data);
                }

                setPage((prev) => prev + 1);
            }
        };

        const observer = new IntersectionObserver(isIntersection);

        if (observer && loadRef && hasMore) {
            observer.observe(loadRef.current);
        }

        return () => {
            if (observer && loadRef) observer.disconnect();
        };
    }, [page]);

  return (
    <div className="container">

      <div className="grid grid-cols-3 gap-4">
        {photos && photos.data.map((photo) => (
          <CardItem key={photo.id} photo={photo} />
        ))}
      </div>


      <div className="text-center">
      {hasMore && (
                <div
                    ref={loadRef}
                    className="bg-green-600 text-white inline-block py-2 px-4 cursor-pointer"
                >
                    Load More ...
                </div>
            )}
      </div>
    </div>
  );
}

export default App;
