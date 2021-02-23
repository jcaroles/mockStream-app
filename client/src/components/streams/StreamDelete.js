import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";

const StreamDelete = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStream(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const onSubmit = (id) => {
    props.deleteStream(id);
  };

  const actions = (
    <div>
      <button
        onClick={() => onSubmit(props.match.params.id)}
        className="ui primary button negative"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </div>
  );

  const renderContent = () => {
    if (!props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream ${props.stream.title}?`;
  };

  return (
    <div>
      <Modal
        title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
