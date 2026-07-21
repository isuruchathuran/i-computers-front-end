import Swal from 'sweetalert2';

/**
 * Global SweetAlert2 confirmation utility
 * @param {Object} options
 * @param {string} options.title - The modal title
 * @param {string} options.text - The modal description
 * @param {string} options.icon - 'warning', 'info', 'question', 'success', 'error'
 * @param {string} options.confirmButtonText - Text for confirm button
 * @param {string} options.cancelButtonText - Text for cancel button
 * @param {string} options.confirmButtonColor - e.g., '#ef4444' (Red), '#f97316' (Orange), '#10b981' (Green), '#0ea5e9' (Blue)
 * @param {Function} options.onConfirm - Async function to run on confirm
 * @param {Function} options.onSuccess - Function to run on successful completion
 * @param {string} options.successTitle - Title for success modal
 * @param {string} options.successText - Text for success modal
 */
export const confirmAction = async ({
    title,
    text,
    icon = 'warning',
    confirmButtonText = 'Yes, Continue',
    cancelButtonText = 'Cancel',
    confirmButtonColor = '#0ea5e9',
    onConfirm,
    onSuccess,
    successTitle = 'Success!',
    successText = 'The action was completed successfully.'
}) => {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: '#374151',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        background: '#1f2937',
        color: '#fff',
        borderRadius: '1rem',
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                if (onConfirm) {
                    await onConfirm();
                }
            } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error?.response?.data?.message || error.message}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
        customClass: {
            popup: 'rounded-2xl border border-gray-700 shadow-2xl',
            container: 'z-[99999]'
        }
    });

    if (result.isConfirmed) {
        if (onSuccess) {
            onSuccess();
        }
        Swal.fire({
            title: successTitle,
            text: successText,
            icon: 'success',
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#10b981',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                popup: 'rounded-2xl border border-gray-700 shadow-2xl',
                container: 'z-[99999]'
            }
        });
    }
};
