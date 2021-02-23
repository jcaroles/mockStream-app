import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";

import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStream(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const onSubmit = (formValues) => {
    props.editStream(props.match.params.id, formValues);
  };

  if (!props.stream) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          onSubmit={onSubmit}
          initialValues={_.pick(props.stream, "title", "description")}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { editStream, fetchStream })(
  StreamEdit
);
