

function mergeHistoryStyle(index, size) {
    if (size > 3 && index === 0) {
      return { opacity: "0.4" }
    }
    else if ((size > 3 && index === 1) || (size > 2 && index === 0)) {
      return { opacity: "0.7" }
    }
    return {}
  }

const MergeHistory = ({ mergeHistory }) => {


    return (
        <div id="merge-history">
            {
                mergeHistory.map((item, index) => (
                    <div className="merge-history-item" style={mergeHistoryStyle(index, mergeHistory.length)}>{item}</div>
                ))
            }
        </div>
    )
}

export default MergeHistory;