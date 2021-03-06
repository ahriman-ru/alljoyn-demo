/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 3.0.7
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package org.allseen.alljoyn;

public class AJ_MCastSocket {
  private transient long swigCPtr;
  protected transient boolean swigCMemOwn;

  protected AJ_MCastSocket(long cPtr, boolean cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = cPtr;
  }

  protected static long getCPtr(AJ_MCastSocket obj) {
    return (obj == null) ? 0 : obj.swigCPtr;
  }

  protected void finalize() {
    delete();
  }

  public synchronized void delete() {
    if (swigCPtr != 0) {
      if (swigCMemOwn) {
        swigCMemOwn = false;
        alljoynJNI.delete_AJ_MCastSocket(swigCPtr);
      }
      swigCPtr = 0;
    }
  }

  public void setTx(AJ_IOBuffer value) {
    alljoynJNI.AJ_MCastSocket_tx_set(swigCPtr, this, AJ_IOBuffer.getCPtr(value), value);
  }

  public AJ_IOBuffer getTx() {
    long cPtr = alljoynJNI.AJ_MCastSocket_tx_get(swigCPtr, this);
    return (cPtr == 0) ? null : new AJ_IOBuffer(cPtr, false);
  }

  public void setRx(AJ_IOBuffer value) {
    alljoynJNI.AJ_MCastSocket_rx_set(swigCPtr, this, AJ_IOBuffer.getCPtr(value), value);
  }

  public AJ_IOBuffer getRx() {
    long cPtr = alljoynJNI.AJ_MCastSocket_rx_get(swigCPtr, this);
    return (cPtr == 0) ? null : new AJ_IOBuffer(cPtr, false);
  }

  public AJ_MCastSocket() {
    this(alljoynJNI.new_AJ_MCastSocket(), true);
  }

}
