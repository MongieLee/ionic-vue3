import { toastController } from "@ionic/vue";
import { ToastOptions } from "@ionic/core/dist/types/components/toast/toast-interface";

const showToast = async (options: ToastOptions = {}): Promise<void> => {
  const toast = await toastController.create({
    position: "middle",
    color: "danger",
    duration: 2000,
    ...options,
  });
  toast.present();
};

export default showToast;
