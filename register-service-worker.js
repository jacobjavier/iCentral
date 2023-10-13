if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('https://aghilanbaskar.github.io/pwa-demo/service-worker.js');
    });
}

if ('Notification' in window && Notification.permission != 'granted') {
    console.log('Ask user permission')
    Notification.requestPermission(status => {  
        console.log('Status:'+status)
        displayNotification('Notification Enabled');
    });
}


const displayNotification = notificationTitle => {
    console.log('display notification')
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            console.log(reg)
            const options = {
                    body: 'Thanks for allowing push notification !',
                    icon:  '/assets/icons/icon-512x512.png',
                    vibrate: [100, 50, 100],
                    data: {
                      dateOfArrival: Date.now(),
                      primaryKey: 0
                    }
                  };
    
            reg.showNotification(notificationTitle, options);
        });
    }
};

const updateSubscriptionOnYourServer = subscription => {
    console.log('Write your ajax code here to save the user subscription in your DB', subscription);
    console.log(JSON.stringify(subscription))
    // write your ajax request method using fetch, jquery, axios to save the subscription in your server for later use.
};

const subscribeUser = async () => {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    const applicationServerPublicKey = '89866a93e79e43ec2954faa131a3a1253321e19cdc8f3c511e51d9d4ea74d72f8156b08c61704e1f'; // paste your webpush certificate public key
    const applicationServerKey = x__-dgX8_KM3O9aIFfsVIQbw6WMoqV0jm83r7RTernI(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    })
    .then((subscription) => {
        console.log('User is subscribed newly:', subscription);
        updateSubscriptionOnYourServer(subscription);
    })
    .catch((err) => {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied')
        } else {
          console.error('Failed to subscribe the user: ', err)
        }
    });
};
const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const checkSubscription = async () => {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    if(!swRegistration){
        console.log('No service worker detected')
        return;
    }
    swRegistration.pushManager.getSubscription()
    .then(subscription => {
        if (!!subscription) {
            console.log('User IS Already subscribed.');
            updateSubscriptionOnYourServer(subscription);
        } else {
            console.log('User is NOT subscribed. Subscribe user newly');
            subscribeUser();
        }
    });
};

checkSubscription();
