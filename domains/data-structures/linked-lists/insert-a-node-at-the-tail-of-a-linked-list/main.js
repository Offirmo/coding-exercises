#!/usr/bin/env node
"use strict";


/*
  Node is defined as
  var Node = function(data) {
      this.data = data;
      this.next = null;
  }
*/

// This is a "method-only" submission.
// You only need to complete this method.

function insert(head, data) {
    const node_to_insert = new Node(data)
    let last_node = head

    if (!last_node)
        return node_to_insert

    while(last_node.next)
        last_node = last_node.next

    last_node.next = node_to_insert
    return head
}

