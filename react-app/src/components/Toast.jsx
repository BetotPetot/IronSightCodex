import { useEffect } from 'react'

function Toast({
    visible,
    onClose,
    title = 'COLLECTION ADDED SUCCESSFULLY',
    message = 'Form validation completed.',
}) {
    useEffect(() => {
        if (!visible) return

        const timer = setTimeout(() => {
            onClose()
        }, 4000)

        return () => clearTimeout(timer)
    }, [visible, onClose])

    return (
        <div
            className={`form-toast ${visible ? 'toast-visible' : ''}`}
            role="status"
            aria-live="polite"
        >
            <span className="toast-icon">✓</span>

            <div className="toast-content">
                <strong>{title}</strong>
                <p>{message}</p>
            </div>

            <button
                id="close-toast"
                type="button"
                aria-label="Close notification"
                onClick={onClose}
            >
                ×
            </button>

            <div className="toast-progress" />
        </div>
    )
}

export default Toast