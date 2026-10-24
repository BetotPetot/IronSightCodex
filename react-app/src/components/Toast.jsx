
import { useEffect } from 'react'

function Toast({ visible, onClose }) {
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
                <strong>COLLECTION ADDED SUCCESSFULLY</strong>
                <p>Form validation completed.</p>
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
