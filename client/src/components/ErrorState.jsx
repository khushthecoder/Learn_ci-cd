function ErrorState({ message, action }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
      {action}
    </div>
  );
}

export default ErrorState;
