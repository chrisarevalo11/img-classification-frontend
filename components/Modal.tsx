import Image from "next/image";

interface Props {
  prediction: string;
}

export const showModal = () => {
  const modal: HTMLDialogElement = document.getElementById(
    "modal"
  ) as HTMLDialogElement;

  setTimeout(() => {
    modal.showModal();
  }, 1000);
};

const images: Record<string, string> = {
  bicycle: "/bicycle.svg",
  car: "/car.svg",
  motorcycle: "/bike.svg",
  van: "/van.svg",
};

export default function Modal({ prediction }: Props): React.ReactElement {
  return (
    <dialog id="modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box flex flex-col justify-center items-center">
        <h3 className="font-bold text-3xl text-center">The model says...</h3>
        <p className="py-4 text-center text-lg">
          the image you provided corresponds to a:{" "}
        </p>
        <Image
          src={images[prediction]}
          alt={prediction}
          width={150}
          height={150}
        />
        <p className="py-4 text-2xl font-bold">{prediction}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
