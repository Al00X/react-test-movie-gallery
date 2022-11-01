import MovieGallery from "../components/MovieGallery.component";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full flex flex-col">
      <input
        className="mb-8 mx-auto"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MovieGallery searchTerm={searchTerm} />
    </div>
  );
}
