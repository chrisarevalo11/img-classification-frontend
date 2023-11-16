import Link from "next/link";

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-full p-5 flex justify-center items-center bg-gray-900 text-white">
      <h1 className="py-5 text-center">
        Built with ❤️ in Tadeo University by{" "}
        <Link
          className="btn-link text-emerald-700"
          href={"https://github.com/chrisarevalo11"}
          target="_blank"
        >
          @chrisarevalo11
        </Link>
      </h1>
    </footer>
  );
}
