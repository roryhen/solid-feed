import { mergeProps } from "solid-js";

export default function ErrorPanel(props: { message?: string }) {
  props = mergeProps({ message: "An error occured" }, props);

  return (
    <div class="text-red-800 bg-red-300 w-full h-full font-bold font-mono text-center grid place-items-center">
      <p>{props.message}</p>
    </div>
  );
}
