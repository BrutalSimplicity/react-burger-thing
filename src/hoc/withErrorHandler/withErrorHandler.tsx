import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const withErrorHandler = (WrappedComponent: React.ComponentType, axios: AxiosInstance ) => {
    return class extends React.Component<{}, {error: any}> {
        reqInterceptor: number;
        resInterceptor: number;
        constructor(props: any) {
            super(props);
            this.state = {
                error: null
            };
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(undefined, error => {
                this.setState({ error: error });
            });
        }

        errorConfirmed = () => {
            this.setState({ error: null });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <>
                    <Modal 
                        show={this.state.error != null}
                        modalClosed={this.errorConfirmed}
                        >
                        {this.state.error !== null ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler;