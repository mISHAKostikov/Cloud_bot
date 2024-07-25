import {Component} from '../../Api/Components/Component/Component.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';
import {Telegram} from '../../Api/Units/Telegram/Telegram.js';

import {Counter} from '../Counter/Counter.js';


export class Pay extends Component {
    static _attributes = {
        ...super._attributes,

        text: '',
    };

    static _components = [Counter];

    static _elements = {
        button_send: '',
        button_close: '',
        counter: '',
        text: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static resources = {
        cross: new URL(`${this.name}.svg#cross`, import.meta.url),
    };


    static {
        this.define();
    }


    _ethereum = null;
    _rest = new Rest(`https://mmnds.store`);


    get counter_range() {
        return this._elements.counter.range;
    }
    set counter_range(counter_range) {
        this._elements.counter.range = counter_range;
    }

    get text() {
        return this._attributes.text;
    }
    set text(text) {
        this._attribute__set('text', text);
        this._elements.text.textContent = text;
    }


    _button_close__on_pointerDown() {
        this._close();
    }

    async _button_send__on_pointerDown() {
        let address_from = this._ethereum.selectedAddress;
        let addres_to = '0xRecipientAddress'; // Замените на адрес получателя
        let value = this._elements.counter.value * 0.01; // Сумма в ETH

        let transaction_parameters = {
            to: addres_to,
            from: address_from,
            value: '0x' + Math.floor(value * 1e18).toString(16),
            gas: '21000', // Лимит газа
            gasPrice: '0x' + Math.floor(20 * Math.pow(10, 9)).toString(16), // Цена газа
        };

        try {
            let transaction_hash = await this._ethereum.request({
                method: 'eth_sendTransaction',
                params: [transaction_parameters],
            });

            console.log('Transaction sent! Hash:', transaction_hash);
            alert(`Transaction sent! Hash: ${transaction_hash}`);

            let tg_id = Telegram.user_id__get();

            await this._rest.call('pay', tg_id, this._elements.counter.value);
        } catch (error) {
            console.error('Error sending transaction:', error);
            alert('Error sending transaction: ' + error.message);
        }
    }

    _close() {
        this.remove();
    }

    _eventListeners__define() {
        this._elements.button_send.addEventListener('pointerdown', this._button_send__on_pointerDown.bind(this));
        this._elements.button_close.addEventListener('pointerdown', this._button_close__on_pointerDown.bind(this));
    }

    _init() {
        // this._elements.counter.range = counter_range;
        this._telegram = window.Telegram.WebApp;
        this._metaMask__check_installed();

        if (!this._ethereum) {
            this._close();

            return;
        }

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
// let isMetaMaskInstalled = () => {
//     let { ethereum } = window;
//     return Boolean(ethereum && ethereum.isMetaMask);
// };

// if (isMetaMaskInstalled()) {
//     console.log('MetaMask is installed!');
// } else {
//     alert('Please install MetaMask!');
// }

// // Инициализация MetaMask Onboarding
// let onboarding = new MetaMaskOnboarding();

// // Кнопка "Connect to MetaMask"
// let connectButton = document.getElementById('connectButton');
// let sendTransactionButton = document.getElementById('sendTransactionButton');

// let isMetaMaskConnected = () => ethereum.request({ method: 'eth_accounts' }).then(accounts => accounts.length > 0);

// let onClickConnect = async () => {
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

// let onClickSendTransaction = async () => {
//     let address_from = ethereum.selectedAddress;
//     let addres_to = '0xRecipientAddress'; // Замените на адрес получателя
//     let value = '0.01'; // Сумма в ETH

//     // Создание транзакции
//     let transactionParameters = {
//         to: addres_to,
//         from: address_from,
//         value: ethereum.utils.toHex(ethereum.utils.toWei(value, 'ether')),
//         gas: '21000', // Лимит газа
//         gasPrice: ethereum.utils.toHex(ethereum.utils.toWei('20', 'gwei')), // Цена газа
//     };

//     try {
//         // Отправка транзакции
//         let txHash = await ethereum.request({
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
// let isMetaMaskInstalled = () => {
//     let { ethereum } = window;
//     return Boolean(ethereum && ethereum.isMetaMask);
// };

// if (isMetaMaskInstalled()) {
//     console.log('MetaMask is installed!');
// } else {
//     alert('Please install MetaMask!');
// }

// // Запрос доступа к аккаунтам и активация кнопки
// let connectMetaMask = async () => {
//     try {
//         let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         console.log('Connected account:', accounts[0]);
//         document.getElementById('sendTransactionButton').disabled = false;
//     } catch (error) {
//         console.error('User denied account access:', error);
//     }
// };

// // Отправка транзакции
// let sendTransaction = async () => {
//     let addres_to = document.getElementById('addres_to').value;
//     let amount = document.getElementById('amount').value;
//     let address_from = window.ethereum.selectedAddress; // Адрес отправителя

//     let transactionParameters = {
//         to: addres_to,
//         from: address_from,
//         value: window.ethereum.utils.toHex(window.ethereum.utils.toWei(amount, 'ether')),
//         gas: '21000', // Лимит газа
//         gasPrice: window.ethereum.utils.toHex(window.ethereum.utils.toWei('20', 'gwei')), // Цена газа
//     };

//     try {
//         let txHash = await window.ethereum.request({
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
