// import 'https://unpkg.com/@metamask/onboarding';
//import * as MetaMaskOnboarding from "https://unpkg.com/@metamask/onboarding@1.0.1/dist/metamask-onboarding.cjs.js";
import {Component} from '../../Api/Components/Component/Component.js';
import {Counter} from '../Counter/Counter.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';


export class Pay extends Component {
    static _elements = {
        button: '',
        counter: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static {
        this.define();
    }


    _ethereum = null;
    _rest = new Rest(`https://mmnds.store`);
    _telegram = null;


    async _button__on_pointerDown() {
        let address_from = this._ethereum.selectedAddress;
        let address_to = '0xRecipientAddress'; // Замените на адрес получателя
        let value = String(this._elements.counter.value * 0.01); // Сумма в ETH

        // Создание транзакции
        let transaction_parameters = {
            to: address_to,
            from: address_from,
            value: this._ethereum.utils.toHex(this._ethereum.utils.toWei(value, 'ether')),
            gas: '21000', // Лимит газа
            gasPrice: this._ethereum.utils.toHex(this._ethereum.utils.toWei('20', 'gwei')), // Цена газа
        };

        try {
            // Отправка транзакции
            let txHash = await this._ethereum.request({
                method: 'eth_sendTransaction',
                params: [transaction_parameters],
            });

            console.log('Transaction sent! Hash:', txHash);
            alert(`Transaction sent! Hash: ${txHash}`);

            let tg_id = this._telegram?.initDataUnsafe?.user?.id;

            await this._rest.call('pay', tg_id, this._elements.counter.value);
        } catch (error) {
            console.error('Error sending transaction:', error);
            alert('Error sending transaction: ' + error.message);
        }
    }

    _eventListeners__define() {
        this._elements.button.addEventListener('pointerdown', this._button__on_pointerDown.bind(this));
    }

    _init() {
        this._elements.counter.range = [0, 12];
        this._telegram = window.Telegram.WebApp;

        this._metaMask__check_installed();

        if (!this._ethereum) return;

        //this._onboarding = new MetaMaskOnboarding();
        this._metaMask__connected();
    }

    _metaMask__check_installed() {
        this._ethereum = window.ethereum;

        if (!(this._ethereum && this._ethereum.isMetaMask)) {
            alert('Пожалуйста установите MetaMask!');
        }
    }

    _metaMask__connected() {
        (this._ethereum.request({method: 'eth_accounts'})
            .then(accounts => accounts.length > 0))
            .then(isConnected => {
                if (!isConnected) {
                    alert('Пожалуйста подключите аккаунт!');

                    try {
                        // Запрос доступа к аккаунтам
                        this._ethereum.request({method: 'eth_requestAccounts'});
                        onboarding.stopOnboarding();
                    } catch (error) {
                        console.error(error);
                    }
                    this._metaMask__connected();
                }
                else {
                    alert('Аккаунт подключен!');
                }
            });
    }
}


// Проверка наличия MetaMask
// const isMetaMaskInstalled = () => {
//     const { ethereum } = window;
//     return Boolean(ethereum && ethereum.isMetaMask);
// };

// if (isMetaMaskInstalled()) {
//     console.log('MetaMask is installed!');
// } else {
//     alert('Please install MetaMask!');
// }

// // Инициализация MetaMask Onboarding
// const onboarding = new MetaMaskOnboarding();

// // Кнопка "Connect to MetaMask"
// const connectButton = document.getElementById('connectButton');
// const sendTransactionButton = document.getElementById('sendTransactionButton');

// const isMetaMaskConnected = () => ethereum.request({ method: 'eth_accounts' }).then(accounts => accounts.length > 0);

// const onClickConnect = async () => {
//     try {
//         // Запрос доступа к аккаунтам
//         await ethereum.request({ method: 'eth_requestAccounts' });
//         onboarding.stopOnboarding();
//         connectButton.disabled = true;
//         sendTransactionButton.disabled = false;
//     } catch (error) {
//         console.error(error);
//     }
// };

// const onClickSendTransaction = async () => {
//     const fromAddress = ethereum.selectedAddress;
//     const toAddress = '0xRecipientAddress'; // Замените на адрес получателя
//     const value = '0.01'; // Сумма в ETH

//     // Создание транзакции
//     const transactionParameters = {
//         to: toAddress,
//         from: fromAddress,
//         value: ethereum.utils.toHex(ethereum.utils.toWei(value, 'ether')),
//         gas: '21000', // Лимит газа
//         gasPrice: ethereum.utils.toHex(ethereum.utils.toWei('20', 'gwei')), // Цена газа
//     };

//     try {
//         // Отправка транзакции
//         const txHash = await ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });

//         console.log('Transaction sent! Hash:', txHash);
//         alert(`Transaction sent! Hash: ${txHash}`);
//     } catch (error) {
//         console.error('Error sending transaction:', error);
//         alert('Error sending transaction: ' + error.message);
//     }
// };

// // Обработка кнопок
// connectButton.addEventListener('click', onClickConnect);
// sendTransactionButton.addEventListener('click', onClickSendTransaction);

// // Проверка подключения при загрузке страницы
// isMetaMaskConnected().then(isConnected => {
//     if (isConnected) {
//         connectButton.disabled = true;
//         sendTransactionButton.disabled = false;
//     } else {
//         connectButton.disabled = false;
//         sendTransactionButton.disabled = true;
//     }
// });




// // Проверка наличия MetaMask
// const isMetaMaskInstalled = () => {
//     const { ethereum } = window;
//     return Boolean(ethereum && ethereum.isMetaMask);
// };

// if (isMetaMaskInstalled()) {
//     console.log('MetaMask is installed!');
// } else {
//     alert('Please install MetaMask!');
// }

// // Запрос доступа к аккаунтам и активация кнопки
// const connectMetaMask = async () => {
//     try {
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         console.log('Connected account:', accounts[0]);
//         document.getElementById('sendTransactionButton').disabled = false;
//     } catch (error) {
//         console.error('User denied account access:', error);
//     }
// };

// // Отправка транзакции
// const sendTransaction = async () => {
//     const toAddress = document.getElementById('toAddress').value;
//     const amount = document.getElementById('amount').value;
//     const fromAddress = window.ethereum.selectedAddress; // Адрес отправителя

//     const transactionParameters = {
//         to: toAddress,
//         from: fromAddress,
//         value: window.ethereum.utils.toHex(window.ethereum.utils.toWei(amount, 'ether')),
//         gas: '21000', // Лимит газа
//         gasPrice: window.ethereum.utils.toHex(window.ethereum.utils.toWei('20', 'gwei')), // Цена газа
//     };

//     try {
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });
//         console.log('Transaction sent! Hash:', txHash);
//         alert(`Transaction sent! Hash: ${txHash}`);
//     } catch (error) {
//         console.error('Error sending transaction:', error);
//         alert('Error sending transaction: ' + error.message);
//     }
// };

// // Обработчики событий
// document.getElementById('sendTransactionButton').addEventListener('click', sendTransaction);
// window.addEventListener('load', connectMetaMask);
