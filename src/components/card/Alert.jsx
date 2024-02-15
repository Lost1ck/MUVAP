import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

function ErrorMessage({ message, description }) {
  return (
    <Alert
      message={message}
      description={description}
      type="error"
      closable
    />
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function NotFound({ inputValue }) {
  return (
    <ErrorMessage
      message={`'${inputValue}' - не найдено. Запрашиваешь много, мало получишь.`}
      description="Выполнишь для меня пару заданий, и мы в расчете. Посмотрим, как быстро у тебя башка отойдет после React."
    />
  );
}

NotFound.propTypes = {
  inputValue: PropTypes.string.isRequired,
};

function NoInternetConnection() {
  return (
    <ErrorMessage
      message="Отсутствует подключение к интернету"
      description="В Зоне интернета нет, как в пустыне. Но настоящему разработчику и не нужен – у нас есть книги, коллеги."
    />
  );
}

export { NotFound, NoInternetConnection };
