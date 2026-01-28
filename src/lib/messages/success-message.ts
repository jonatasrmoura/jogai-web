import Swal from "sweetalert2";

export async function successMessage(title: string, message: string) {
  await Swal.fire({
    icon: "success",
    title,
    text: message,
  });
}
