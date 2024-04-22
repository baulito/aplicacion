import React, { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import "./App.css";
import { GlobalProvider } from "./context/Main";
import { InitElement } from "./components/config/InitElement";
import { Routesgeneral } from "./Routes";
import { Carousel, initTE } from "tw-elements";
import 'react-toastify/dist/ReactToastify.css';
//import { ActionPerformed,PushNotificationSchema,PushNotifications,Token} from "@capacitor/push-notifications";
import { AppUpdate } from "@capawesome/capacitor-app-update";
import { ToastContainer } from "react-toastify";
/**
 * Aplicación principal.
 * @returns the Application
 */
function App() {
  /**
   * Inicializamos la applicacion
   */
  useEffect(() => {
    // Inicializar el carrousel es tw-elements
    initTE({ Carousel });
    localStorage.theme = "light";
    checkPlatform();
  }, []);
  

  // Revisamos si el usuario está en una platraforma nativa o no
  const checkPlatform = () => {
    if (Capacitor.isNativePlatform()) {
      //busca  la version actual de la aplicacion y la que esta subida en los markets
      AppUpdate.getAppUpdateInfo().then((res) => {
        if (parseFloat(res.currentVersion) < parseFloat(res.availableVersion)) {
          AppUpdate.openAppStore();
        }
      });
      
      /*PushNotifications.requestPermissions().then((result) => {
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
      // On success, we should be able to receive notifications
      PushNotifications.addListener("registration", (token: Token) => {
        //alert('Push registration success, token: ' + token.value);
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener("registrationError", (error: any) => {
        //alert('Error on registration: ' + JSON.stringify(error));
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotificationSchema) => {
          alert("Push received: " + JSON.stringify(notification));
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: ActionPerformed) => {
          alert("Push action performed: " + JSON.stringify(notification));
        }
      );*/
    } 
  };

  return (
    <GlobalProvider>
      <InitElement>
          <Routesgeneral />
          <ToastContainer/>
      </InitElement>
    </GlobalProvider>
  );
}

export default App;
