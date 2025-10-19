import Swal from "sweetalert2";

export async function errorMessage(title: string, message: string) {
  await Swal.fire({
    icon: "error",
    title,
    text: message,
  });
}
