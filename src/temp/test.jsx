import React from 'react';
import { Modal } from 'antd'
class Test extends React.Component {
    state = {
        modal: true
    }
    render() {
        return (
            <>
                <div>
                    <Modal
                        title="Search Bulk"
                        visible={this.state.modal}
                        footer={null}
                        onCancel={this.handleCancelSearch}
                        okText="Submit"
                        cancelText="Clear"
                        maskClosable={false}
                        centered={true}>
                        <p>How are you</p>

                    </Modal>
                </div>
            </>
        )
    }
}
export default Test