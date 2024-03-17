const messageForm = document.querySelector('#add-message');
const emptyChatMessage = document.querySelector('#empty-chat');
const messagesContainer = document.querySelector('#messages-container');

let notEmpty = false;
//счетчик сообщение, при нуле сообщение появляется
let counterMessage = 0;


//обновление формы
messageForm.addEventListener('submit', event => {
	event.preventDefault();
	const { username, usermessage } = getFormObject(messageForm);
	addMessage(username, usermessage, new Date());
	counterMessage++;
	messageForm.reset();
});

//-----// 
//функция добавления сообщения
function addMessage(name, message, date) {
	if (!notEmpty) {
		notEmpty = true;
		emptyChatMessage.style.display = 'none';
	}

	//создали элемент DOM кнопка
	let buttonDelete = document.createElement('button');
	buttonDelete.id = 'delete-message';
	
	buttonDelete.style.width = '100px';
	buttonDelete.style.height = '30px';
	buttonDelete.innerText = 'Remove';
	buttonDelete.style.padding = '2px 14px';
	buttonDelete.style.cursor = 'pointer';
	buttonDelete.style.position = 'relative';
	buttonDelete.style.top = '-20px';
	buttonDelete.style.left = '630px';
	buttonDelete.style.textAlign ='center';

	//обработчик на удаление
	buttonDelete.addEventListener('click', ()=>{
		newMessage.remove();
	})

	//описание добавления сообщения
	const newMessage = generateElement('div', 'message');
	let messageArray = [];
	const currentMonth = (date.getMonth() + 1 < 10 ? '0' : '') +
		(date.getMonth() + 1);

	const messageHeader = generateElement('div', 'message-header');	
	newMessage.appendChild(messageHeader);
	messageHeader.appendChild(generateElement(
		'h4',
		'message-title',
		'',
		name
	));
	messageHeader.appendChild(generateElement(
		'p',
		'message-date',
		'',
		`${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${currentMonth}.${date.getFullYear()}`
		
	));

	newMessage.appendChild(generateElement(
		'p',
		'message-text',
		'',
		message,	
	));
	newMessage.appendChild(buttonDelete);

	buttonDelete.addEventListener('click', ()=>{
		newMessage.remove();
		counterMessage--;
		if(counterMessage == 0) {
			notEmpty = false;
			emptyChatMessage.style.display = 'block'; //включили отображение сообщения "There are no messages"
		}
	})

	messagesContainer.appendChild(newMessage);
}
//-----// 


//возвращает массив элементов формы - используется при обновлении формы
function getFormObject(form) {
	return Array.from(form.elements)
		.filter(element => {
			return element.type != 'submit';
		}).reduce((result, element) => {
			const { name, type } = element;
			const value = type == 'checkbox' ? element.checked : element.value;
			result[name] = value;
			return result;
		}, {});
}

//создает элементы - используется при добавлении сообщений
function generateElement(tagName, tagClass = '', tagId = '', tagValue = '') {
	const newElement = document.createElement(tagName);
	newElement.className = tagClass;
	newElement.id = tagId;
	newElement.innerText = tagValue;
	return newElement;
}