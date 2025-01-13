import { useState } from 'react';
import { useRouter } from 'next/router';

const Validate: React.FC = () => {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleValidation = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/user/validation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la validación.');
            }

            setSuccessMessage('Cuenta validada correctamente.');
            setTimeout(() => router.push('/'), 2000);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Validar Cuenta</h1>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            <form onSubmit={handleValidation} style={styles.form}>
                <div style={styles.field}>
                    <label>Código de Validación:</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.buttons}>
                    <button
                        type="button"
                        style={styles.menuButton}
                        onClick={() => router.push('/register')}
                    >
                        Volver al Registro
                    </button>
                    <button type="submit" style={styles.validateButton}>
                        Validar
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
        padding: '20px',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: '20px',
    },
    success: {
        color: 'green',
        marginBottom: '20px',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    field: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    menuButton: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    validateButton: {
        backgroundColor: '#2196f3',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Validate;